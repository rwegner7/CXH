({
    retrieveDataFromApex: function(component,
                                   helper,
                                   apexMethod,
                                   apexMethodParams,
                                   optionalLocalSaveToVar,
                                   optionalSuccessCallbackFn,
                                   optionalOverrideErrorCallbackFn){
        // Validate required function parameters exist
        if(!component || !helper || !apexMethod){
            throw new Error(
                'retrieveDataFromApex function called with missing parameters'
            );
        }

        // Define APEX method and APEX parameters (if they exist)
        var action = component.get(apexMethod);
        if(apexMethodParams){
            action.setParams(apexMethodParams);
        }

        // Request data from APEX
        action.setCallback(this, function(response){
            var state = response.getState();

            if(state === "SUCCESS"){
                let responseValue = response.getReturnValue();

                // Save response to local attribute if optionalLocalSaveToVar argument exists
                if(optionalLocalSaveToVar){
                    component.set(optionalLocalSaveToVar, responseValue);
                }

                // Execute optionalSuccessCallbackFn if argument exists
                if(optionalSuccessCallbackFn){
                    optionalSuccessCallbackFn(component, helper, responseValue);
                }
            }
            else if(state === "ERROR"){
                let errors = response.getError();

                // Execute optionalOverrideErrorCallbackFn if argument exists
                if(optionalOverrideErrorCallbackFn){
                    optionalErrorCallbackFn(component, helper, errors);
                }
                // Else, process errors normally
                else{
                    // If an error message exists, capture and use it for the error message,
                    // else use an unknown error message
                    let errorMessage = errors && errors[0] && errors[0].message ?
                        'Failure requesting data from APEX method: ' + errors[0].message :
                        'Unknown failure while requesting data from APEX method';

                    throw new Error(errorMessage);
                }
            }
        });

        $A.enqueueAction(action);
    },

    showModal: function(component, helper, titleText, bodyText){
        // Define modal attributes
        let modal_attributes = {
            'titleText': titleText,
            'bodyText': bodyText
        };

        // Define modal callback function
        let modal_callbackFn = function(createdComponent, status, errorMessage){
            if(status === 'SUCCESS'){
                var body = component.get('v.body');
                body.push(createdComponent);
                component.set('v.body', body);
            }
        }

        // Create modal component
        $A.createComponent(
            'c:ContractGenerator_Modal',
            modal_attributes,
            modal_callbackFn
        );
    }
})