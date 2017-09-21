import SimpleSchema from 'simpl-schema';
import { SettingTypes } from '../Setting';

export class UniformsSettingsTransformer
{
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
     * @param {String} key
     * @param {Object} def
     * @return {*}
     */
    const reducer = (acc, {key, def}) => {
      acc[key] = def;
      return acc;
    };

    const mapped = definitions.map(mapper).filter(transformed => !!transformed);

    if (mapped.length !== definitions.length) {
      throw new Error('Could not map definitions');
    }

    return new SimpleSchema(mapped.reduce(reducer, {}));
  }

  /**
   * @param props
   * @return {{key, def: {type: String}}}
   */
  static transformChoice(props)
  {
    return {
      key: props.name,
      def: {
        type: String
      }
    };
  }

  /**
   * @param props
   * @return {{key, def: {type: String}}}
   */
  static transformText(props)
  {
    return {
      key: props.name,
      def: {
        type: String
      }
    };
  }

  /**
   * @param props
   * @return {{key, def: {type: String}}}
   */
  static transformTextarea(props)
  {
    return {
      key: props.name,
      def: {
        type: String
      }
    };
  }

  /**
   * @param props
   * @return {{key, def: {type: String}}}
   */
  static transformBoolean(props)
  {
    return {
      key: props.name,
      def: {
        type: String
      }
    };
  }

};