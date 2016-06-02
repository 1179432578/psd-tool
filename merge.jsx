﻿/*author : lewis  *data : 5/2/2016  *function : merge visible layers of psd   *///debug  mode//$.level = 1//layout of dialog var dlg = new Window('dialog', 'PSD MERGE');dlg.location = [100, 100];dlg.size = [300, 100];dlg.btnPnl = dlg.add('panel', [0, 0, 300, 300], 'MERGE'); dlg.btnPnl.mergeBtn = dlg.btnPnl.add('button', [20, 20, 70, 70], 'MERGE');//merge psd buttondlg.btnPnl.closeBtn = dlg.btnPnl.add('button', [230, 20, 280, 70], 'CLOSE');//close dialog button/*just close dialog and the merge will not be stoped */function closeBtnOnClick(){    dlg.close (0);}dlg.btnPnl.closeBtn.onClick = closeBtnOnClick;var docNew;//new doucumentvar doc;//old document/*copy visible items to new document*/function copyDocument(obj, parentObj){    //copy artLayer    if(obj.artLayers){        for(var i=0; i<obj.artLayers.length; i++){            var artLayer = obj.artLayers[i];                         //if it is not visible then skip it            if(!artLayer.visible) continue;                      app.activeDocument = doc;//active it beacuse we will copy from it            var newArtLayer = artLayer.duplicate(parentObj, ElementPlacement.PLACEATEND);            app.activeDocument = docNew;//active it beacuse we will copy to it            newArtLayer.name = artLayer.name;        }    }    //copy layerSet    if(obj.layerSets){        for(var i=obj.layerSets.length-1; i>=0; i--){            var layerSet = obj.layerSets[i];                         //if it is not visible then skip it            if(!layerSet.visible) continue;                       //if new document exist the layerSet then don't add new layerSet           try{               //if the layerSet is not exist then it will throw execption               parentObj.layerSets.getByName(layerSet.name)           }           catch(e){               var newLayerSet = parentObj.layerSets.add();               newLayerSet.name = layerSet.name;           }          finally{              copyDocument(layerSet, parentObj.layerSets.getByName(layerSet.name));          }                   }    }}/*show document infomation*/function mergeBtnOnClick(){    var docCount = app.documents.length;//documents count    if(docCount <= 0 ){return;}    doc = app.documents[0];//first document    var name = doc.name;    var width = doc.width;    var height = doc.height;    var resolution = doc.resolution;        /*create a new psd file*/    docNew = app.documents.add(width, height, resolution, name);        /*copy old document to new document*/    for(var i=0; i<docCount; i++){        doc = app.documents[i];        copyDocument(doc, docNew);    }    /*delete the default Background Layer*/    var bgArtLayer    try{        bgArtLayer = docNew.artLayers.getByName("背景");        bgArtLayer.isBackgroundLayer = false;        bgArtLayer.remove();    }    catch(e){}    finally{}         /*finish merge psd operation then show tip of merge finished*/    alert ("merge finished");}dlg.btnPnl.mergeBtn.onClick = mergeBtnOnClick;//finally show dialogdlg.show();