/**
 * Created by ryan on 11/2/2017.
 */
({
    findAccount : function(cmp, accountId){
        accountId = accountId || '';
        var action =cmp.get("c.findAccount");

        action.setParams({
            "accountId" : accountid
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
    }
})