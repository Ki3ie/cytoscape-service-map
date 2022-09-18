import { Component, OnInit } from "@angular/core";
import cytoscape, { Core, ElementsDefinition, NodeSingular, Stylesheet } from "cytoscape";
import fcose, { FcoseLayoutOptions } from "cytoscape-fcose";

@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css'],
})
export class CytoscapeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    cytoscape.use(fcose);

    const layout: FcoseLayoutOptions = {
      name: 'fcose',
      quality: "default",
      randomize: true,
      animate: false,
      fit: true,
      padding: 25,
      idealEdgeLength(): number {
        return 100;
      },
      nestingFactor: 0.1,
      gravityRangeCompound: 1.5,
      gravityCompound: 1.0,
      alignmentConstraint: {
        vertical: [
          ['1.2', '1.4'],
          ['1.3', '1.5'],
          ['2.5', '2.1'],
        ],
        horizontal: [
          ['1.2', '1.3'],
          // @ts-ignore
          ['1.4', '1.5', '2.4', '2.3', '2.1', '2.2']
        ]
      },
      relativePlacementConstraint: [
        // @ts-ignore
        {
          left: '1.5',
          right: '2.4'
        },
        {
          top: '1.3',
          bottom: '1.5',
          gap: 25
        }
      ],
    };
    const elements: ElementsDefinition = {
      nodes: [
        {
          data: {
            "id": "1.1",
            "parent": "1"
          }
        },
        {
          data: {
            "id": "1.2",
            "parent": "1"
          }
        },
        {
          data: {
            "id": "1.3",
            "parent": "1"
          }
        },
        {
          data: {
            "id": "1.4",
            "parent": "1"
          }
        },
        {
          data: {
            "id": "1.5",
            "parent": "1"
          }
        },
        {
          data: {
            "id": "1"
          },
        },
        {
          data: {
            "id": "2.1",
            "parent": "2"
          }
        },
        {
          data: {
            "id": "2.2",
            "parent": "2"
          }
        },
        {
          data: {
            "id": "2.3",
            "parent": "2"
          }
        },
        {
          data: {
            "id": "2.4",
            "parent": "2"
          }
        },
        {
          data: {
            "id": "2.5",
            "parent": "2"
          }
        },
        {
          data: {
            "id": "2"
          }
        }
      ],
      edges: [
        {
          data: {
            'source': '1.1',
            'target': '1.2',
          }
        },
        {
          data: {
            'source': '1.2',
            'target': '1.3',
          }
        },
        {
          data: {
            'source': '1.4',
            'target': '1.5',
          }
        },
        {
          data: {
            'source': '1.1',
            'target': '1.4',
          }
        },
        {
          data: {
            'source': '2.1',
            'target': '2.2',
          }
        },
        {
          data: {
            'source': '2.3',
            'target': '2.4',
          }
        },
        {
          data: {
            'source': '2.1',
            'target': '2.5',
          }
        },
        {
          data: {
            'source': '2.1',
            'target': '2.3',
          }
        },
        {
          data: {
            'source': '2.4',
            'target': '1.5',
          }
        }
      ]
    };
    const style: Stylesheet[] = [
      {
        selector: "node",
        style: {
          content: (node: NodeSingular) => `Service ${node.id()}`
        }
      },
      {
        selector: ":parent",
        style: {
          content: (node: NodeSingular) => `Application ${node.id()}`,
          "text-margin-y": -4
        }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle'
        }
      }
    ];
    const cy: Core = cytoscape({
      container: document.getElementById("cy"),
      elements,
      style,
      layout,
      maxZoom: 2,
      minZoom: 0.2,
      zoomingEnabled: true,
      userZoomingEnabled: true,
      autoungrabify: false
    });
    cy.center(cy.nodes().filter((node: NodeSingular) => node.id() === "1"))
  }
}
