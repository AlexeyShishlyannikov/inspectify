import 'package:flutter/material.dart';

class ReportFormBuildPage extends StatefulWidget {
  final String reportFormId;

  ReportFormBuildPage(this.reportFormId);

  @override
  ReportFormBuildPageState createState() {
    return ReportFormBuildPageState(this.reportFormId);
  }
}

class ReportFormBuildPageState extends State<ReportFormBuildPage> {
  final String reportFormId;
  final _formKey = GlobalKey<FormState>();
  final _nameTextController = TextEditingController();
  final _descriptionTextController = TextEditingController();

  ReportFormBuildPageState(this.reportFormId);

  Widget _buildNameTextField() {
    return TextFormField(
      controller: _nameTextController,
      decoration: InputDecoration(labelText: 'Name'),
      onSaved: (String input) {},
      validator: (String input) {},
    );
  }

  Widget _buildDescriptionTextField() {
    return TextFormField(
      controller: _descriptionTextController,
      decoration: InputDecoration(labelText: 'Description'),
      onSaved: (String input) {},
      validator: (String input) {},
    );
  }

  Widget _buildFormInfoTextFields() {
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          _buildNameTextField(),
          SizedBox(height: 10.0),
          _buildDescriptionTextField(),
        ],
      ),
    );
  }

  Widget _buildFormInputTile(int index) {
    return Column(
      children: <Widget>[
        Dismissible(
          key: Key(index.toString()),
          direction: DismissDirection.endToStart,
          background: Container(color: Colors.red),
          child: ListTile(
            leading: CircleAvatar(
              child: Text((index + 1).toString()),
            ),
            title: Text('Name'),
            subtitle: Text('Description'),
            trailing: Icon(Icons.keyboard_arrow_right),
          ),
          onDismissed: (DismissDirection direction) {},
        ),
        Divider(),
      ],
    );
  }

  List<Widget> _buildFormInputTilesList() {
    return List.generate(6, (index) {
      return _buildFormInputTile(index);
    });
  }

  Widget _buildFormInputTiles() {
    return Column(
      children: [
        Text('Inputs', style: TextStyle(fontSize: 18.0)),
        SizedBox(height: 10.0),
      ]
        ..addAll(_buildFormInputTilesList())
        ..addAll([
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              RaisedButton(
                child: Row(
                  children: <Widget>[
                    Icon(Icons.add),
                    Text('Add Input'),
                  ],
                ),
                onPressed: () {
                  Navigator.pushNamed(context, '/report-forms/input/');
                },
              ),
              SizedBox(width: 10.0),
              RaisedButton(
                child: Text('Reorder'),
                onPressed: () {},
              ),
            ],
          ),
          SizedBox(height: 10.0),
        ]),
    );
  }

  Widget _buildSubmitButton() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        RaisedButton(
          child: Text('Save'),
          onPressed: () {
            Navigator.pushReplacementNamed(context, '/report-forms');
          },
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Build Form'),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
        child: ListView(
          children: <Widget>[
            _buildFormInfoTextFields(),
            SizedBox(height: 20.0),
            _buildFormInputTiles(),
            _buildSubmitButton(),
            SizedBox(height: 10.0),
          ],
        ),
      ),
    );
  }
}
