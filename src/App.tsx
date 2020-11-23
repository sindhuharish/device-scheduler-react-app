import React from 'react';

import './App.css';

import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda, 
  EventSettingsModel} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

class App extends React.Component {

// private localData: EventSettingsModel = {
//  dataSource: [{
//    EndTime: new Date(2020, 0, 11, 6, 30),
//    StartTime: new Date(2020, 0, 11, 4, 0),
//    Subject: 'Testing',
//    IsReadonly: true
//  }]
// };
// private remoteData = new DataManager ({
//   url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
//   adaptor: new WebApiAdaptor(),
//   crossDomain: true,
  
// });
state ={
  data: []
}
 componentDidMount() {
  fetch('https://calendar-service-app.cloud.pcftest.com/Events?deviceEmailId=sindhu.harish@philips.com&startDate=ge2020-10-05&endDate=le2020-11-09')
  .then(response => response.json())
  .then(json => this.setState({
    data: json

    }))

   setInterval(() => {
    fetch('https://calendar-service-app.cloud.pcftest.com/Events?deviceEmailId=sindhu.harish@philips.com&startDate=ge2020-10-05&endDate=le2020-11-09')
    .then(response => response.json())
    .then(json => {
      console.log(this.state.data)
      if(JSON.stringify(this.state.data) !== JSON.stringify(json)) {
        console.log(json)
        this.setState({
          data: json
    
        })
      }
     })
    

   }, 50000)
   
  
 };
 private editorWindowTemplate(props: any): JSX.Element {
  return (props !== undefined ? <table className="custom-event-editor" style={{ width: '100%' }}><tbody>
  <tr><td className="e-textlabel">Name</td><td colSpan={4}>
    <input id="Name" className="e-field e-input" type="text" name="Location" style={{ width: '100%' }}/>
  </td></tr>
  <tr><td className="e-textlabel">Patient Id</td><td colSpan={4}>
    <input id="Patient Id" className="e-field e-input" type="text" name="Id" style={{ width: '100%' }}/>
  </td></tr>
  <tr><td className="e-textlabel">Date Of Birth</td><td colSpan={4}>
    <input id="Date Of Birth" className="e-field e-input" type="text" name="Categorize" style={{ width: '100%' }}/>
  </td></tr>
  <tr><td className="e-textlabel">From</td><td colSpan={4}>
    <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
  </td></tr>
  <tr><td className="e-textlabel">To</td><td colSpan={4}>
    <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"></DateTimePickerComponent>
  </td></tr>
  <tr><td className="e-textlabel">Phone</td><td colSpan={4}>
    <input id="Phone" className="e-field e-input" type="text" name="Description" style={{ width: '100%' }}/>
  </td></tr></tbody></table> : <div></div>);


 }
  public render() {
    return  <ScheduleComponent width='100%' height='550px' agendaDaysCount={8} selectedDate={new Date(2020, 9, 5)}
      eventSettings={{ dataSource : this.state.data}} 
      views = {['Day','Week','Month', 'Agenda']}
      editorTemplate={this.editorWindowTemplate.bind(this)}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>

  }
}

export default App;
