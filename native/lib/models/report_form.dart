import 'package:flutter/foundation.dart';

enum FormFieldType {
  TextField,
  NumberField,
  PhotoField,
}

class ReportForm {
  final String id;
  final DateTime created;
  final DateTime updated;
  final String description;
  final String name;
  final bool isArchived;
  final List<ReportFormField> formFields;

  ReportForm({
    @required this.id,
    @required this.name,
    @required this.description,
    @required this.created,
    @required this.updated,
    @required this.isArchived,
    @required this.formFields,
  });

  ReportForm copyWith({
    String id,
    DateTime created,
    String description,
    String name,
    List<ReportFormField> formFields,
  }) {
    return ReportForm(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      created: created ?? this.created,
      updated: updated ?? this.updated,
      isArchived: isArchived ?? this.isArchived,
      formFields: formFields ?? this.formFields,
    );
  }

  ReportForm.fromJson(Map json)
      : id = json['id'],
        name = json['name'],
        description = json['description'],
        created = json['created'],
        updated = json['updated'],
        isArchived = json['isArchived'],
        formFields = (json['form_fields'] as List)
            .map((formField) => ReportFormField.fromJson(formField))
            .toList();

  Map toJson() => {
        'created': created,
        'description': description,
        'name': name,
        'isArchived': isArchived,
        'updated': updated,
        'form_fields': formFields.map((field) => field.toJson()).toList(),
      };

  @override
  String toString() => toJson().toString();
}

class ReportFormField {
  final String id;
  final String description;
  final String name;
  final bool isRequired;
  final FormFieldType type;

  ReportFormField({
    @required this.id,
    @required this.description,
    @required this.name,
    @required this.isRequired,
    @required this.type,
  });

  ReportFormField copyWith({
    String id,
    String description,
    String name,
    FormFieldType type,
  }) {
    return ReportFormField(
      id: id ?? this.id,
      description: description ?? this.description,
      name: name ?? this.name,
      isRequired: isRequired ?? this.isRequired,
      type: type ?? this.type,
    );
  }

  ReportFormField.fromJson(Map json)
      : id = json['id'],
        description = json['description'],
        name = json['name'],
        isRequired = json['isRequired'],
        type = json['type'];

  Map toJson() => {
        'id': id,
        'description': description,
        'name': name,
        'isRequired': isRequired,
        'type': type,
      };

  @override
  String toString() => toJson().toString();
}
