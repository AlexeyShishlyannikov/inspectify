import 'package:flutter/material.dart';

class AuthChangePasswordPage extends StatefulWidget {
  @override
  AuthChangePasswordPageState createState() {
    return AuthChangePasswordPageState();
  }
}

class AuthChangePasswordPageState extends State<AuthChangePasswordPage> {
  final _formKey = GlobalKey<FormState>();
  final _oldPasswordTextController = TextEditingController();
  final _passwordTextController = TextEditingController();

  Widget _buildOldPasswordTextField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Old Password'),
      keyboardType: TextInputType.text,
      obscureText: true,
      controller: _oldPasswordTextController,
      validator: (String input) {
        if (input.length < 6) {
          return 'Password should be at least 6 characters.';
        }
      },
    );
  }

  Widget _buildPasswordTextField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Password'),
      keyboardType: TextInputType.text,
      obscureText: true,
      controller: _passwordTextController,
      validator: (String input) {
        if (input.length < 6) {
          return 'Password should be at least 6 characters.';
        }
      },
    );
  }

  Widget _buildConfirmPasswordTextField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Confirm Password'),
      keyboardType: TextInputType.text,
      obscureText: true,
      validator: (String input) {
        if (_passwordTextController.text != input) {
          return 'Passwords don\'t match.';
        }
      },
    );
  }

  Widget _buildSubmitButton() {
    return RaisedButton(
      child: Text('Reset Password'),
      onPressed: _submitForm,
    );
  }

  void _submitForm() {
    if (_formKey.currentState.validate()) {
      _formKey.currentState.save();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reset Password'),
      ),
      body: Column(
        children: <Widget>[
          _buildOldPasswordTextField(),
          _buildPasswordTextField(),
          _buildConfirmPasswordTextField(),
          _buildSubmitButton(),
        ],
      ),
    );
  }
}
