import 'package:flutter/material.dart';

class AuthResetPasswordPage extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final _passwordTextController = TextEditingController();

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
    if (!_formKey.currentState.validate()) {
      return;
    }
    _formKey.currentState.save();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reset Password'),
      ),
      body: Container(
        padding: EdgeInsets.all(32.0),
        child: Center(
          child: Column(
            children: <Widget>[
              _buildPasswordTextField(),
              _buildConfirmPasswordTextField(),
              _buildSubmitButton(),
            ],
          ),
        ),
      ),
    );
  }
}
