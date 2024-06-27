import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { SignUp } from '../pages/signup';
import '@testing-library/jest-dom';
import {auth, googleProvider} from "../config/firebase";
import { createMockUser, getAuth } from 'firebase/auth';
import {createUserWithEmailAndPassword, signInWithPopup,onAuthStateChanged, } from "firebase/auth";

describe('SignUp', () => {
  test('renders sign-up form correctly', () => {
    const history = createMemoryHistory();
    const { getByPlaceholderText, getByText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );

    const emailInput = getByPlaceholderText('Enter Email');
    const passwordInput = getByPlaceholderText('Enter Password');
    const signUpButton = getByText('SignUp');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

});
