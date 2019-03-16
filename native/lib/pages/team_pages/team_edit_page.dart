import 'package:flutter/material.dart';

class TeamEditPage extends StatefulWidget {
  final String teamId;
  
  TeamEditPage(this.teamId);
  @override
  TeamEditPageState createState() {
    return TeamEditPageState(teamId);
  }
}

class TeamEditPageState extends State<TeamEditPage> {
  final String teamId;
  
  final TextEditingController _nameTextController = TextEditingController();
  final TextEditingController _descriptionTextController =
      TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  
  TeamEditPageState(this.teamId);

  Widget _buildTeamModelForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          TextFormField(
            controller: _nameTextController,
            keyboardType: TextInputType.text,
            decoration: InputDecoration(labelText: 'Name'),
            onSaved: (String input) {},
            validator: (String input) {},
          ),
          SizedBox(height: 10.0),
          TextFormField(
            maxLines: 4,
            controller: _descriptionTextController,
            keyboardType: TextInputType.text,
            decoration: InputDecoration(labelText: 'Description'),
            onSaved: (String input) {},
            validator: (String input) {},
          ),
          SizedBox(height: 10.0),
          RaisedButton(
            child: Text('Save'),
            onPressed: () {
              Navigator.pop(context);
            },
          )
        ],
      ),
    );
  }

  Widget _buildTeamManagerTile() {
    return Column(
      children: <Widget>[
        Text('Manager'),
        Card(
          child: Column(
            children: <Widget>[
              Text('# Managers'),
              RaisedButton(
                child: Text('Edit managers'),
                onPressed: () {
                  Navigator.pushNamed(context, '/drivers');
                },
              )
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTeamDriversTile() {
    return Column(
      children: <Widget>[
        Text('Team'),
        Card(
          child: Column(
            children: <Widget>[
              Text('# Drivers'),
              RaisedButton(
                child: Text('Edit drivers'),
                onPressed: () {
                  Navigator.pushNamed(context, '/drivers');
                },
              )
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTeamVehiclesTile() {
    return Column(
      children: <Widget>[
        Text('Vehicles'),
        Card(
          child: Column(
            children: <Widget>[
              Text('# Vehicles'),
              RaisedButton(
                child: Text('Edit drivers'),
                onPressed: () {
                  Navigator.pushNamed(context, '/drivers');
                },
              )
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTeamActionItems() {
    return Container();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Team'),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
        child: ListView(
          children: <Widget>[
            _buildTeamModelForm(),
            _buildTeamManagerTile(),
            _buildTeamDriversTile(),
            _buildTeamVehiclesTile(),
            _buildTeamActionItems(),
          ],
        ),
      ),
    );
  }
}
