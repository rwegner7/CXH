/**
 * Created by ryan on 11/2/2017.
 */
({
    getFields : function (cmp,event,helper){
        var sellerId = cmp.get("v.sellerId");
        helper.getFields(cmp, sellerId);
    },
    saveRecord : function (cmp,event,helper){
        var record = cmp.get("v.record");
        record.sobjectType='Account';
        helper.saveRecord(cmp,record);
    },
    closeModal: function(cmp){
        var modalEvent = $A.get("e.c:Event_CloseModal");
        modalEvent.setParams({
            'modal_close': '',
            'object': '',
            'refresh': 'false'
        });
        modalEvent.fire();
    }
})