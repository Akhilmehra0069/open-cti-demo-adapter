/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // store call center settings, so they're easily accessible ny all panels. Bring up the CTI login panel.
    init: function(cmp, event, helper) {
        if (!(sforce && sforce.opencti)) {
          throw new Error('Unable to load Open CTI. Update Call Center settings or contact your admin.');
        }
        sforce.opencti.getCallCenterSettings({
            callback : function(response) {
                if (response.success) {
                    cmp.set('v.settings', response.returnValue);
                } else {
                    throw new Error(
                        'Unable to load call center settings. Contact your admin.')
                }
            }
        })

        cmp.getEvent('renderPanel').setParams({
            type: 'c:ctiLoginPanel',
        }).fire();
    },

    // renderPanel event handler. Used to replace the current view with a given panel.
    renderPanel: function(cmp, event, helper) {
        var params = event.getParams();
        helper.renderPanel(cmp, params);
    },

    // getSettings event handler. Returns the stored call center settings.
    getSettings: function(cmp, event, helper) {
        var callback = event.getParams().callback;
        callback(cmp.get('v.settings'));
    },

    // editPanel event handler. Updates the softphone panel label.
    editPanel: function(cmp, event, helper) {
        var params = event.getParams();
        if (params.label) {
            sforce.opencti.setSoftphonePanelLabel({
                label: params.label
            });
        }
    }
})
