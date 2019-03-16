import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:logisticsinspect/constants/constants.dart';
import 'package:logisticsinspect/store/store_model.dart';
import 'package:logisticsinspect/store/user_store/user_thunk_actions.dart';
import 'package:redux/redux.dart';
import '../../store/user_store/user_actions.dart';

enum AuthMode {
  Login,
  Register,
  Forgot,
  Reset,
}

class AuthPage extends StatefulWidget {
  @override
  _AuthPageState createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  final _emailTextController = TextEditingController();
  final _passwordTextController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  AuthMode _authMode = AuthMode.Login;

  Widget _buildEmailTextFormField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Email'),
      keyboardType: TextInputType.emailAddress,
      controller: _emailTextController,
      validator: (String input) {
        if (input.isEmpty || !RegExp(emailRegexp).hasMatch(input)) {
          return 'Please provide a valid email.';
        }
      },
    );
  }

  Widget _buildPasswordTextFormField() {
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

  Widget _buildConfirmPasswordTextFormField() {
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

  void _submitForm(_AuthViewModel viewModel) {
    if (!_formKey.currentState.validate()) {
      return;
    }
    _formKey.currentState.save();
    if (_authMode == AuthMode.Login) {
      viewModel.login(_emailTextController.text, _passwordTextController.text);
    }
    if (_authMode == AuthMode.Register) {
      viewModel.register(
          _emailTextController.text, _passwordTextController.text);
    }
  }

  void _switchAuthModes() {
    setState(() {
      _authMode =
          _authMode == AuthMode.Login ? AuthMode.Register : AuthMode.Login;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Container(
        padding: EdgeInsets.all(10.0),
        child: Center(
          child: SingleChildScrollView(
            child: Form(
              key: _formKey,
              child: Column(
                children: <Widget>[
                  _buildEmailTextFormField(),
                  _buildPasswordTextFormField(),
                  _authMode == AuthMode.Register
                      ? _buildConfirmPasswordTextFormField()
                      : Container(),
                  FlatButton(
                    child: Text('Switch to ' +
                        (_authMode == AuthMode.Login ? 'REGISTER' : 'LOGIN')),
                    onPressed: _switchAuthModes,
                  ),
                  StoreConnector<AppState, _AuthViewModel>(
                    onInit: (store) {},
                    converter: (store) => _AuthViewModel.fromStore(store),
                    builder: (_, viewModel) {
                      return viewModel.store.state.userState.isLoading
                          ? CircularProgressIndicator()
                          : RaisedButton(
                              child: Text(_authMode == AuthMode.Login
                                  ? 'Login'
                                  : 'Register'),
                              onPressed: () => _submitForm(viewModel),
                            );
                    },
                    onDidChange: (viewModel) {
                      if (viewModel.store.state.userState.isAuthenticated) {
                        Navigator.pushReplacementNamed(context, '/dashvoard');
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _AuthViewModel {
  final Store<AppState> store;
  _AuthViewModel({
    @required this.store,
  });

  factory _AuthViewModel.fromStore(Store<AppState> store) {
    return _AuthViewModel(store: store);
  }

  void login(String email, String password) {
    store
        .dispatch(loginUser(LoginUserAction(email: email, password: password)));
  }

  void register(String email, String password) {
    store.dispatch(
        registerUser(RegisterUserAction(email: email, password: password)));
  }
}
