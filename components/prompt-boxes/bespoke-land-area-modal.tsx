
const BespokeLandAreaModal = (props) => {
  console.log("Props: ", props)
  return (
    <>
      <div className="modal">
        <div id="bespokeLandAreaModal" className={`fixed top-[200px] left-1/2 translate-[-50%] bg-white p-[20px] round-[8px] w-[400px] ${props.showModal ? "" : "hidden"}`}>
          <h3>Bespoke Land Area</h3>
          <div id="bespokeLandAreaForm">
              
          </div>

          
          <div id="bespokeSubTotalDiv" className={'flex justify-between mb-[10px] text-bold'}>
              <label htmlFor="bespokeSubTotal">Bespoke Sub Total</label>
              <input type="number" id="bespokeSubTotal" readOnly className="w-[60px]" />
          </div>
          <div id="bespokeTotalAreaDiv" className={'flex justify-between mb-[20px] text-bold'}>
              <label htmlFor="bespokeTotalArea">Bespoke Total Area</label>
              <input type="number" id="bespokeTotalArea" placeholder="Total Area (Ha)" step="0.01" className="w-[60px]" />
          </div>

          
          <div className={'flex justify-between mb-[10px]'}>
              <button id="bespokeProRataButton">Pro Rata</button>
              <button id="bespokeUndoButton">Undo</button>
          </div>
          <div  className={'flex justify-between'}>
              <button id="submitBespokeLandArea">Submit</button>
              <button id="bespokeCancelButton">Cancel</button>
          </div>
        </div>

        
      </div>
        
        
    </>
  )
}

export default BespokeLandAreaModal