import * as L from "leaflet";
import {Pl3xMap} from "../../Pl3xMap";
import {Util} from "../../util/Util";
import {World} from "../World";
import {MarkerOptions} from "./options/MarkerOptions";
import {Circle} from "./Circle";
import {Ellipse} from "./Ellipse";
import {Icon} from "./Icon";
import {MultiPolygon} from "./MultiPolygon";
import {MultiPolyline} from "./MultiPolyline";
import {Polygon} from "./Polygon";
import {Polyline} from "./Polyline";
import {Rectangle} from "./Rectangle";

export class Markers {
    private static _types = {
        "circ": (data: unknown[], options: MarkerOptions | undefined) => new Circle(data, options),
        "elli": (data: unknown[], options: MarkerOptions | undefined) => new Ellipse(data, options),
        "icon": (data: unknown[], options: MarkerOptions | undefined) => new Icon(data, options),
        "multipoly": (data: unknown[], options: MarkerOptions | undefined) => new MultiPolygon(data, options),
        "multiline": (data: unknown[], options: MarkerOptions | undefined) => new MultiPolyline(data, options),
        "poly": (data: unknown[], options: MarkerOptions | undefined) => new Polygon(data, options),
        "line": (data: unknown[], options: MarkerOptions | undefined) => new Polyline(data, options),
        "rect": (data: unknown[], options: MarkerOptions | undefined) => new Rectangle(data, options)
    }
    private readonly _world: World;
    private readonly _name: string;
    private readonly _layer: L.LayerGroup;
    private readonly _interval: number;

    constructor(world: World, name: string, interval: number) {
        this._world = world;
        this._name = name;
        this._layer = L.layerGroup();
        this._interval = interval;

        this._layer.addTo(Pl3xMap.getInstance().map);

        this.update();
    }

    update(): void {
        //if (true) return;
        Util.getJSON(`tiles/${this._world.name}/markers/${this._name}.json`)
            .then((json) => {
                for (const index in Object.keys(json)) {
                    Markers.parseMarker(json[index])?.addTo(this._layer);
                }
            });
    }

    clear(): void {
        this._layer.removeFrom(Pl3xMap.getInstance().map);
    }

    static parseMarker(data: unknown[]): L.Layer | undefined {
        const options = data.length > 2 ? new MarkerOptions(data[2] as unknown[]) : undefined;

        const type = this._types[data[0] as keyof typeof this._types];
        const marker = type ? type(data[1] as unknown[], options).marker : undefined;

        if (marker) {
            const popup = options?.popup;
            const tooltip = options?.tooltip;
            if (popup) {
                marker.bindPopup(() => popup.content, popup.properties);
            }
            if (tooltip) {
                marker.bindTooltip(() => tooltip.content, tooltip.properties);
            }
        }

        return marker;
    }
}
