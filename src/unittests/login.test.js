import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../pages/login';
import '@testing-library/jest-dom';
import {auth, googleProvider} from "../config/firebase";
import { createMockUser, getAuth } from 'firebase/auth';
import {createUserWithEmailAndPassword, signInWithPopup,onAuthStateChanged, } from "firebase/auth";

describe('Login', () => {
  test('renders log-in form correctly', () => {
    const history = createMemoryHistory();
    const { getByPlaceholderText, getByText } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const emailInput = getByPlaceholderText('Enter Email');
    const passwordInput = getByPlaceholderText('Enter Password');
    const logInButton = getByText('Login');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
  });
});