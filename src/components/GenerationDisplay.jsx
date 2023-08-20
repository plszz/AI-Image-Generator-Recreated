import CarouselDisplay from './carouselDisplay'
import DurationDisplay from './DurationDisplay'

import Spinner from 'react-bootstrap/Spinner';

export default function GenerationDisplay({generateButtonClicked, imageData, durationData, loading}) {

    function determineDisplay() {
        if (loading.screen) return <Spinner animation="border" />
        else if (durationData.done || durationData.faulted) return <CarouselDisplay imageData={imageData}/>
        else if (durationData.done === false) return <DurationDisplay durationData={durationData}/>
        else return
    }

    return (
        <div id="generationDisplay-div">
            <div className="imageDisplay-div">
                {determineDisplay()}
            </div>

            <div className="controlDisplay-div">
                <button id="generate-button" onClick={generateButtonClicked}>Generate</button>
            </div>
        </div>
    )
}