console.log("kicker loading...");

k = {};

notify.notify = function(a, b) {
    console.log('NOTIFYING: ' + a);
    var d = notify.type[a];
    if ((d || d == 0) && notify.observers[d])
        notify.observers[d].notify(b)
},

kMob = null;
notify.register("callBattleApply", function(a) {
    kMob = a;
    a = c.objExtend({
        type : gl.enums.battleApplyType.mob,
        id : 300042
    }, a || {});
    notify.notify("audio", {
        id : "bg1",
        method : "pause"
    });
    notify.notify("audio", {
        id : "battle1"
    });
    im.send({
        protocol : "callBattleApply",
        data : [ a.type, a.id ]
    })
});

addEventListener("keypress", function(e) {
    switch (e.which) {
    case 97: // a
        notify.notify("callBattleApply", kMob)
        break;
    case 113: // q
    	autoBattle = true;
    	autoBattleInterval = setInterval(function() {
    		if (autoBattle) {
    			notify.notify("callBattleApply", kMob)
    		} else {
    			clearInterval(autoBattleInterval)
    		}
    	}, 3000);
        break;
    case 115: // s

        break;
    case 120: // x
        im.send({
            protocol : "callEquipUp",
            data : kEquip
        });
        break;
    case 122: // z
    	autoBattle = false;
        notify.notify("battleEnd")
    }
});

kEquip = null;
k.send = im.send;
im.send = function(a) {
    if (a.protocol == "callEquipUp") {
        kEquip = a.data
    }
    k.send(a)
}

console.log("kicker loaded!")
