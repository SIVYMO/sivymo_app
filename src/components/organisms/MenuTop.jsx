import React from 'react'
import logonovopatent from "../../assets/img/logonovopatent.jpg";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import {confirm_goout, goout} from '../../utils/Strings'

export default function MenuTop() {
     const items = [
          {
              label: "File",
              icon: "pi pi-fw pi-file",
              items: [
                  {
                      label: "New",
                      icon: "pi pi-fw pi-plus",
                      items: [
                          {
                              label: "Bookmark",
                              icon: "pi pi-fw pi-bookmark",
                          },
                          {
                              label: "Video",
                              icon: "pi pi-fw pi-video",
                          },
                      ],
                  }               
              ],
          },
          {
              label: "Edit",
              icon: "pi pi-fw pi-pencil",
              items: [
                  {
                      label: "Left",
                      icon: "pi pi-fw pi-align-left",
                  },
                  {
                      label: "Right",
                      icon: "pi pi-fw pi-align-right",
                  },
                  {
                      label: "Center",
                      icon: "pi pi-fw pi-align-center",
                  },
                  {
                      label: "Justify",
                      icon: "pi pi-fw pi-align-justify",
                  },
              ],
          },
          {
              label: "Users",
              icon: "pi pi-fw pi-user",
              items: [
                  {
                      label: "New",
                      icon: "pi pi-fw pi-user-plus",
                  },
                  {
                      label: "Delete",
                      icon: "pi pi-fw pi-user-minus",
                  },
                  {
                      label: "Search",
                      icon: "pi pi-fw pi-users",
                      items: [
                          {
                              label: "Filter",
                              icon: "pi pi-fw pi-filter",
                              items: [
                                  {
                                      label: "Print",
                                      icon: "pi pi-fw pi-print",
                                  },
                              ],
                          },
                          {
                              icon: "pi pi-fw pi-bars",
                              label: "List",
                          },
                      ],
                  },
              ],
          },
          {
              label: "Events",
              icon: "pi pi-fw pi-calendar",
              items: [
                  {
                      label: "Edit",
                      icon: "pi pi-fw pi-pencil",
                      items: [
                          {
                              label: "Save",
                              icon: "pi pi-fw pi-calendar-plus",
                          },
                          {
                              label: "Delete",
                              icon: "pi pi-fw pi-calendar-minus",
                          },
                      ],
                  },
                  {
                      label: "Archieve",
                      icon: "pi pi-fw pi-calendar-times",
                      items: [
                          {
                              label: "Remove",
                              icon: "pi pi-fw pi-calendar-minus",
                          },
                      ],
                  },
              ],
          },
      ];
  
      const confirm = () => {
          confirmDialog({
              message: confirm_goout,
              header: goout,
              icon: 'pi pi-exclamation-triangle',
              accept: () => {console.log('acepto')},
              reject: () => {console.error('no acepto')}
          });
      }

      const start = (
          <img
              alt="logo"
              src={logonovopatent}
              height="50"
              className="p-mr-2"
          ></img>
      );
      const end = (
        <Button className="p-button-success" onClick={confirm} label="Salir" icon="pi pi-sign-out" />
  
      );
  
      return (
          <div>
              <div className="card">
                  <Menubar model={items} start={start} end={end} />
              </div>
          </div>
      );
}
