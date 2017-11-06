({
    findAccount : function(cmp, accountId){
        accountId = accountId || '';
        var action =cmp.get("c.findAccount");

        action.setParams({
            "accountId" : ''
        });

        action.setCallback(this, function(res){
            var state = res.getState();
            if(state=="SUCCESS"){
                var result = res.getReturnValue();
                cmp.set('v.acct',result.account);
            }

        });
        $A.enqueueAction(action);
    }
})