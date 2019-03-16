import 'package:flutter/material.dart';

class ReportFormInputBuildPage extends StatelessWidget {
  final String inputId;

  final _formKey = GlobalKey<FormState>();
  final _nameTextController = TextEditingController();
  final _descriptionTextController = TextEditingController();

  ReportFormInputBuildPage(this.inputId);

  Widget _buildNameTextField() {
    return TextFormField(
      controller: _nameTextController,
      keyboardType: TextInputType.text,
      decoration: InputDecoration(labelText: 'Name'),
      onSaved: (String input) {},
      validator: (String input) {},
    );
  }

  Widget _buildDescriptionTextField() {
    return TextFormField(
      controller: _descriptionTextController,
      keyboardType: TextInputType.text,
      decoration: InputDecoration(labelText: 'Description'),
      onSaved: (String input) {},
      validator: (String input) {},
    );
  }

  Widget _buildInputTypeDropdown() {
    return Container(
      height: 150.0,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: <Widget>[
          RaisedButton(
            child: Text('Text'),
            onPressed: () {},
          ),
          RaisedButton(
            child: Text('Number'),
            onPressed: () {},
          ),
          RaisedButton(
            child: Text('Radio'),
            onPressed: () {},
          ),
          RaisedButton(
            child: Text('Options'),
            onPressed: () {},
          ),
          RaisedButton(
            child: Text('Photo'),
            onPressed: () {},
          ),
        ],
      ),
    );
  }

  Widget _buildValuesSelection() {
    return Container();
  }

  Widget _buildSubmitButton() {
    return RaisedButton(
      child: Text('Save'),
      onPressed: () {},
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Input'),
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          children: <Widget>[
            _buildNameTextField(),
            SizedBox(height: 10.0),
            _buildDescriptionTextField(),
            SizedBox(height: 10.0),
            _buildInputTypeDropdown(),
            _buildValuesSelection(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                _buildSubmitButton(),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
