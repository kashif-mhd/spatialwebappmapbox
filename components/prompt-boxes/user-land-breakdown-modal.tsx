import React, { useEffect, useRef, useState } from 'react';
import * as maputils from '@/utils/maputils/maputils-main';

const UserLandBreakdownModal = () => {
  const [landClasses, setLandClasses] = useState<any[]>();
  useEffect(() => {
    maputils.fetchSlopeClasses().then((data) => {
      console.log("Classes: ", data)
      setLandClasses(data.data);
    })

  });
  return (
    <>
      

      <div className="modal">
        <div id="landClassModal" className={'fixed top-1/2 left-1/2 translate-[-50%] bg-white p-[20px] round-[8px] w-[400px]'}>
          <label htmlFor="landClassSelect">Select a land class:</label>
          <select id="landClassSelect">
              <option value="">--Select a land class--</option>
              {landClasses && landClasses.map((option) => {
                return (
                  <option key={option.strlandclass} value={option.id}>
                    {option.strlandclass}
                  </option>
                );
              })}
          </select>
          <br/><br/>
          <label htmlFor="ineffectiveCheckbox">Ineffective:</label>
          <input type="checkbox" id="ineffectiveCheckbox"/>
          <br/><br/>
          <button id="landClassSubmit">OK</button>
        </div>
      </div>
        
        
    </>
  )
}

export default UserLandBreakdownModal