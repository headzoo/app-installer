import {CustomField} from './CustomField'

const toSettingsRequest = (appId, name, value) => {
  return {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `apps/${appId}/state/app:${appId}/${name}`,
    data: { value }
  };
};

/**
 * @param {string} appId
 * @param {CustomField} customField
 * @return {{method: string, headers: {Accept: string, Content-Type: string}, url: string, body}}
 */
const toCustomFieldRequest = (appId, customField) =>
{
  const urlMap = {
    'ticket': `/ticket_custom_fields`,
    'organization': `/organization_custom_fields`,
    'person': `/person_custom_fields`,
  };
  const url = urlMap[customField.attachedTo];

  if (!url) {
    throw new Error('could not map custom field to create field request');
  }

  return {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: url,
    data: {
      title: customField.alias,
      is_enabled: customField.enabled,
      alias: customField.getQualifiedAlias(appId),
      handler_class: customField.getHandlerClass()
    }
  };
};

export class AppInstallerService
{
  /**
   * @param {{post: function}} api
   * @param {string} appId
   * @param {{}} values
   * @return {Promise.<{}>}
   */
  saveSettings(api, appId, values)
  {
    const url = `batch`;
    const requests = Object.keys(values).reduce((acc, key) => {
      acc[key] = toSettingsRequest(appId, key, values[key]);
      return acc;
    }, {});

    if (Object.keys(requests).length > 0) {
      return api.post(url, {requests }).then(() => values);
    }

    return Promise.resolve(values);
  }

  /**
   * @param {{post: function}} api
   * @param {String} appId
   * @param {[]} customFields
   * @return {Promise.<[]>}
   */
  createCustomFields(api, appId, { customFields })
  {
    if (customFields instanceof Array && customFields.length > 0) {
      const url = `batch`;
      const requests = customFields.map(props => (new CustomField(props))).reduce((acc, customField) => {
        acc[customField.alias] = toCustomFieldRequest(appId, customField);
        return acc;
      }, {});
      return api.post(url, { requests }).then(() => customFields);
    }

    return Promise.resolve(customFields);
  }

  /**
   * @param {{put: function}} api
   * @param appId
   * @param {boolean} status
   * @return {Promise.<{status: *}>}
   */
  setInstalled(api, appId, { status })
  {
    return api.put(`apps/${appId}`, { is_installed: status }).then(() => ({ status }));
  }
}