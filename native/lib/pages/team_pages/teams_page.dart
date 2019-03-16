import 'package:flutter/material.dart';
import 'package:logisticsinspect/widgets/drawers/drawer.dart';

class TeamsPage extends StatelessWidget {
  Widget _buildSearchBox() {
    return TextField(
      decoration: InputDecoration(
        prefixIcon: Icon(Icons.search),
        labelText: 'Search',
      ),
      keyboardType: TextInputType.text,
      onChanged: (String input) {},
    );
  }

  Widget _buildTeamCardImage() {
    return Icon(Icons.people);
  }

  Widget _buildTeamCardStats() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text('# Drivers'),
        Text('Manager: Name'),
      ],
    );
  }

  Widget _buildTeamCard(BuildContext context, int index) {
    return Column(
      children: <Widget>[
        ListTile(
          leading: _buildTeamCardImage(),
          title: Text('Team Name'),
          subtitle: _buildTeamCardStats(),
          trailing: Icon(Icons.keyboard_arrow_right),
          onTap: () {
            Navigator.pushNamed(context, '/teams/view/' + 1.toString());
          },
        ),
        Divider(),
      ],
    );
  }

  Widget _buildTeamsActionItems() {
    return Container();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Teams'),
      ),
      drawer: AppDrawer(),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).requestFocus(FocusNode()),
        child: Column(
          children: <Widget>[
            _buildSearchBox(),
            Expanded(
              child: ListView.builder(
                itemBuilder: _buildTeamCard,
                itemCount: 5,
              ),
            ),
            _buildTeamsActionItems(),
          ],
        ),
      ),
    );
  }
}
