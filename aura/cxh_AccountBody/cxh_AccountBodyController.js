
({
    openSingleFile: function(cmp, event, helper) {
        $A.get('e.lightning:openFiles').fire({
            recordIds: [cmp.get("v.fileId")]
        });
    },
    refresh : function (cmp,event,helper){
        var accountId = cmp.get("v.accountId");
        var object = event.getParam("object");
        var refresh = event.getParam("refresh");
        if(refresh && object === 'AccountDescription'){
            helper.findAccount(cmp, accountId);
        }
    },
    openModal : function(cmp,event){
        var recordId = cmp.get("v.accountId");
        var modalEvent = $A.get("e.c:Event_OpenModal");
        modalEvent.setParams({
            'modal_open': 'c:cxh_AccountBodyModal',
            'recordId': recordId
        });
        modalEvent.fire();
    }

})