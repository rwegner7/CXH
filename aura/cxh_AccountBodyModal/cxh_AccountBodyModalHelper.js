({
    getFields : function(cmp,sellerId) {
        sellerId = sellerId || '';
        var action = cmp.get("c.findAccount");

        action.setParams({
            "accountId" : sellerId
        });

        action.setCallback(this,function(res){
            var state = res.getState();
            if(state =="SUCCESS"){
                var result = res.getReturnValue();
                cmp.set('v.record',result.account);
            }
        });
        $A.enqueueAction(action);
    },
    saveRecord  : function(cmp,record){
        var action = cmp.get("c.updateAccount");
        action.setParams({
            "record" : record
        });
        var self = this;
        action.setCallback(this,function(res){
            var result = res.getState();
            if(result === "SUCCESS"){
                self.closeModal(cmp);
            }
            else if (result === "ERROR") {
                var errors = res.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + errors[0].message);
                    }
                }
                else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    saved : function(cmp) {
        alert('Saved records');
    },
    closeModal : function(cmp){
        var modalEvent = $A.get("e.c:Event_CloseModal");
        modalEvent.setParams({
            'modal_close': '',
            'object': 'AccountDescription',
            'refresh': 'true'
        });
        modalEvent.fire();
    },

})