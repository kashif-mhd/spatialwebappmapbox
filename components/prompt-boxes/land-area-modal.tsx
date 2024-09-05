
const LandAreaModal = () => {
  return (
    <>
      <div className="modal">
        <div id="landAreaModal" className={'fixed top-1/2 left-1/2 translate-[-50%] bg-white p-[20px] round-[8px] w-[400px]'}>
            <h3>Land Area</h3>
            <div id="landAreaForm">
                
            </div>

            <div id="subTotalDiv" className={'flex justify-between mb-[10px] text-bold'}>
                <label htmlFor="subTotal">Sub Total</label>
                <input className={'w-[60px]'} type="number" id="subTotal" readOnly />
            </div>
            <div id="totalAreaDiv" className={'flex justify-between mb-[20px]'}>
                <label htmlFor="totalArea">Total Area</label>
                <input type="number" className="w-[60px]" id="totalArea" placeholder="Total Area (Ha)" step="0.01" />
            </div>

            <div className={'flex justify-between mb-[10px]'}>
                <button id="proRataButton">Pro Rata</button>
                <button id="undoButton">Undo</button>
            </div>
            <div  className={'flex justify-between'}>
                <button id="submitLandArea">Submit</button>
                <button id="cancelButton">Cancel</button>
            </div>
        </div>

      </div>
    </>
  )
}

export default LandAreaModal