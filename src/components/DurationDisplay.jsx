export default function DurationDisplay({durationData}) {
    return (
        <div id="statusDisplay-div">
            
            <h3>Generation Status</h3>
            <p id="imageStatus">Pending: {durationData.waiting} - Processing: {durationData.processing} - Finished: {durationData.finished} - Restarted: {durationData.restarted} {/*- Failed: {durationData.failed}*/}</p>
            <h5 id="durationStatus">Time left: {durationData.wait_time} - Queue position: {durationData.queue_position}</h5>
        </div>
    )
}