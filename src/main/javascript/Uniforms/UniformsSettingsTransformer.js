import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms/SimpleSchema2Bridge';
import SelectField from 'uniforms-unstyled/SelectField'; // Choose your theme package.
import LongTextField from 'uniforms-unstyled/LongTextField'; // Choose your theme package

import { SettingTypes } from '../Setting';
import BoolField from './BoolField';


/**
 * @param {SettingDefProps} props
 */
const mapValidatorProps = (props) =>
{
  if (props.validator && props.validator.type === 'regex') {
    return {regEx: new RegExp(props.validator.pattern)};
  }

  return {};
};

export class UniformsSettingsTransformer
{
  static defsToSchemaBridge(definitions)
  {
    const schema = UniformsSettingsTransformer.defsToSchema(definitions);
    return new SimpleSchema2Bridge(schema);
  }

  /**
   * @param {Array} definitions
   * @return {SimpleSchema}
   */
  static defsToSchema(definitions)
  {
    const mapper = (definition) => {
      const type = SettingTypes.typeOf(definition);

      switch (type) {
        case SettingTypes.TYPE_BOOLEAN:
          return UniformsSettingsTransformer.transformBoolean(definition);
        case SettingTypes.TYPE_TEXT:
          return UniformsSettingsTransformer.transformText(definition);
        case SettingTypes.TYPE_CHOICE:
          return UniformsSettingsTransformer.transformChoice(definition);
        case SettingTypes.TYPE_TEXTAREA:
          return UniformsSettingsTransformer.transformTextarea(definition);
        default:
          return null;
      }
    };

    /**
     * @param {Object} acc
     * @param fragment
     * @return {*}
     */
    const reducer = (acc, fragment) => {
      return { ...acc, ...fragment };
    };

    const mapped = definitions.map(mapper).filter(transformed => !!transformed);

    if (mapped.length !== definitions.length) {
      throw new Error('Could not map definitions');
    }

    return new SimpleSchema(mapped.reduce(reducer, {}));
  }

  /**
   * @param {SettingDefProps} props
   * @return {{}}
   */
  static transformChoice(props)
  {
    if (props.multi) {
      return {
        [props.name]: {
          type: Array,
          defaultValue: props.defaultValue,
          optional: !props.required,
          allowedValues: props.choices.map(choice => choice.value),
          uniforms: {
            component: SelectField,
            options: props.choices.map(choice => ({label: choice.title, value: choice.value}))
          }
        },
        [`${props.name}.$`]: {
          type: String
        }
      };
    }

    return {
      [props.name]: {
        type: String,
        defaultValue: props.defaultValue,
        optional: !props.required,
        allowedValues: props.choices.map(choice => choice.value),
        uniforms: {
          component: SelectField,
          options: props.choices.map(choice => ({label: choice.title, value: choice.value}))
        }
      }
    };

  }

  /**
   * @param props
   * @return {{}}
   */
  static transformText(props)
  {
    const validator = mapValidatorProps(props);

    return {
      [props.name] : {
        ...validator,
        type: String,
        defaultValue: props.defaultValue,
        optional: !props.required
      }
    };
  }

  /**
   * @param {SettingDefProps} props
   * @return {{}}
   */
  static transformTextarea(props)
  {
    const validator = mapValidatorProps(props);
    return {
      [props.name] : {
        ...validator,
        type: String,
        defaultValue: props.defaultValue,
        optional: !props.required,
        uniforms: {
          component: LongTextField
        }
      }
    };

  }

  /**
   * @param {SettingDefProps} props
   * @return {{}}
   */
  static transformBoolean(props)
  {
    return {
      [props.name] : {
        type: Boolean,
        defaultValue: props.defaultValue,
        optional: !props.required,
        uniforms: {
          component: BoolField
        }
      }
    };
  }
}