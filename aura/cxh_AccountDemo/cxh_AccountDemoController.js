
({
    queryAccounts : function(cmp, event, helper) {
        var action = cmp.get("c.findAccount");

        action.setParams({
            "accountId" : cmp.get("v.accountId")
        });

        action.setCallback(this, function(res){
            var state = res.getState();
            if(state=="SUCCESS"){
                var result = res.getReturnValue();
                cmp.set('v.acct',result.account);
                cmp.set('v.accountId',result.account.Id);
                cmp.set('v.fileId', result.fileId);
            }

        });
        $A.enqueueAction(action);
    },
    openModal : function(cmp,event) {
        var newcmp = event.getParam("modal_open");
        var recordId = event.getParam("recordId");
        var accountId = cmp.get("v.accountId");
        $A.createComponent(
            newcmp,
            {"accountId": accountId, "recordId": recordId},
            function(newCmp, status){
                if (status === "SUCCESS" && cmp.isValid()) {
                    cmp.find("modal-window").set("v.body", newCmp);
                }
            });
    },
    cancelModal : function(cmp,event,helper){
        cmp.find("modal-window").set("v.body", []);
        var object = event.getParam("object");
        var refresh = event.getParam("refresh");
        var accountId = cmp.get("v.accountId");
        if(refresh){

        }
    }
})