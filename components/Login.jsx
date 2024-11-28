import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";


export default function Login() {
  const initialData = {
    email: "",
    password: "",
    terms: false
  };

  const ErrorMessages = {
    email: "Geçerli bir e mail adresi giriniz",
    password: "Şifreniz en az bir büyük karakter ve bir küçük karakter içermelidir. Uzunluğu en az 9 olmalıdır",
  };

  const history = useHistory();
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false
  });
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validatePassword(pass) {
    return /[A-Z]/.test(pass) &&
           /[a-z]/.test(pass) &&
           /[0-9]/.test(pass) &&
           /[^A-Za-z0-9]/.test(pass) &&
           pass.length > 4;
  }

  useEffect(() => {
    if (
      validateEmail(form.email) &&
      validatePassword(form.password) &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if(name === "email") {
      setErrors({
        ...errors,
        email: !validateEmail(value),
      });
    }

    if(name === "password") {
      setErrors({
        ...errors,
        password: !validatePassword(value),
      });
    }

    if(name === 'terms') {
      setErrors({
        ...errors,
        terms: !value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password === form.password && item.email === form.email
        );
        if (user) {
            history.push('/success');
        } else {
            history.push('/error');
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="email">Email </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          invalid={errors.email}
          onChange={handleChange}
        />
       
        {errors.email && <FormFeedback>{ErrorMessages.email}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          invalid={errors.password}
          onChange={handleChange}
        />
       {errors.password && <FormFeedback>{ErrorMessages.password}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Input
          id="terms"
          name="terms"
          type="checkbox"
          checked={form.terms}
          invalid={errors.terms}
          onChange={handleChange}
        />
        <Label for="terms">I agree to all terms</Label>
      </FormGroup>

      <Button disabled={!isValid}>Kaydet</Button>
    </Form>
  );
}