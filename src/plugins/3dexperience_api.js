import { widget, requirejs } from "@widget-lab/3ddashboard-utils";

export function _httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], WAFData => {
        WAFData.authenticatedRequest(url, options);
    });
}

function _setDraggable(elem, strData, onDrag) {
    requirejs(["DS/DataDragAndDrop/DataDragAndDrop"], DataDragAndDrop => {
        DataDragAndDrop.draggable(elem, { data: strData, start: onDrag });
    });
}

function _setupTagger(tags, onTaggerFilter = undefined) {
    requirejs(["DS/TagNavigatorProxy/TagNavigatorProxy"], TagNavigatorProxy => {
        let taggerProxy;
        if (taggerProxy === undefined) {
            taggerProxy = TagNavigatorProxy.createProxy({
                widgetId: widget.id,
                filteringMode: "WithFilteringServices"
            });

            if (onTaggerFilter !== undefined) taggerProxy.addEvent("onFilterSubjectsChange", onTaggerFilter);
        }
        taggerProxy.setSubjectsTags(tags);
    });
}

function _setDroppable(elem, drop) {
    requirejs(["DS/DataDragAndDrop/DataDragAndDrop"], DataDragAndDrop => {
        DataDragAndDrop.droppable(elem, { drop });
    });
}

export function _getPlatformServices(platformId, onComplete, onFailure) {
    requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], i3DXCompassServices => {
        if (!platformId || platformId === "") platformId = widget.getValue("PlatFormInstanceId");
        if (!platformId || platformId === "") platformId = undefined;
        console.log("ça se passe bien ?");
        i3DXCompassServices.getPlatformServices({
            platformId,
            onComplete,
            onFailure
        });
    });
}
