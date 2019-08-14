const policy = {
    createHTML: (s: string) => s,
    createScript: (s: string) => s,
    createScriptURL: (s: string) => s,
    createURL: (s: string) => s,
};

// $ExpectType string[]
trustedTypes.getPolicyNames();
trustedTypes.createPolicy('default', policy, true);
// $ExpectType TrustedTypePolicy | null
trustedTypes.getExposedPolicy('default');

const testPolicy = trustedTypes.createPolicy('test', policy);

// $ExpectType string
const policyName = testPolicy.name;
// $ExpectType TrustedHTML
testPolicy.createHTML('');
// $ExpectType TrustedScript
testPolicy.createScript('');
// $ExpectType TrustedScriptURL
testPolicy.createScriptURL('');
// $ExpectType TrustedURL
testPolicy.createURL('');

const htmlOnlyPolicy = trustedTypes.createPolicy('htmlOnly', {
  createHTML: (html: string) => {
    return html;
  },
});

// $ExpectType string
const htmlOnlyName = htmlOnlyPolicy.name;
// $ExpectType TrustedHTML
const html = htmlOnlyPolicy.createHTML('');
// $ExpectError
const script = htmlOnlyPolicy.createScript('');

// $ExpectType boolean
trustedTypes.isHTML(html);
// $ExpectType boolean
trustedTypes.isScript(html);
// $ExpectType boolean
trustedTypes.isScriptURL(html);
// $ExpectType boolean
trustedTypes.isURL(html);

// $ExpectType TrustedHTML
trustedTypes.emptyHTML;

// Testing the legacy factory name.
// $ExpectType TrustedTypePolicyFactory
TrustedTypes;
