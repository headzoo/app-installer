const toSettingsRequest = (appId, name, value) => {
  return {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `apps/${appId}/state/app:${appId}/${name}`,
    body: JSON.stringify(value)
  };
};

export class AppInstallService
{
  /**
   * @param {{post: function}} api
   * @param {string} appId
   * @param values
   * @return {Promise.<T>}
   */
  saveSettings(api, appId, values)
  {
    const url = `batch`;
    const body = Object.keys(values).reduce((acc, key) => {
      acc[key] = toSettingsRequest(appId, key. values[key]);
      return acc;
    });

    return api.post(url, body).then(() => settings);
  }

  /**
   * @param {{post: function}} api
   * @param {String} appId
   * @param {[]} customFields
   * @return {Promise.<ClusterSettings>}
   */
  createCustomFields(api, appId, customFields)
  {
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
    return api.put(`apps/${appId}`, { is_installed: status }).then(() => settings);
  }
}