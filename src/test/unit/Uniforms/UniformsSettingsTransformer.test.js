import {UniformsSettingsTransformer} from '../../../main/javascript/Uniforms'
import SimpleSchema from 'simpl-schema';

test('transform settings to schema', done => {

  const settings = [
    {
      type: "text",
      name: "text_setting",
      title: "A text setting",

      defaultValue: "foo",
      required: true,
      validator: {
        type: "regex",
        pattern: "\d+"
      },
      serverOnly: true
    },

    {
      type: "textarea",
      name: "textarea_setting",
      title: "A textarea setting",

      defaultValue: "foo",
      required: true,
      validator: {
        type: "regex",
        pattern: "\d+"
      },
      serverOnly: true
    },

    {
      type: "choice",
      name: "choice_setting",
      title: "A choice setting",

      defaultValue: "foo",
      multi: false,
      required: true,
      choices: [ {title: "Foo", value: "bar" } ]
    },

    {
      type: "boolean",
      name: "boolean_setting",
      title: 'A boolean setting',

      defaultValue: false,
      required: true
    },

  ];

  let error = null;
  let schema = null;
  try {
    schema = UniformsSettingsTransformer.defsToSchema(settings);
  } catch (e) {
    error = e;
  }

  expect(schema instanceof SimpleSchema).toBe(true);
  expect(error).toBeNull();

  done();
});