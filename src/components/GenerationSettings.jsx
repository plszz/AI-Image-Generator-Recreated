import TextInput from "./TextInput"
import RangeInput from "./RangeInput"
import SwitchInput from "./SwitchInput"
import SelectorInput from "./SelectorInput"

export default function GenerationSettings({data, settingsCallback}) {
    return(
        <div id="generationSettings-div">
            <TextInput field="Prompt" fieldName="prompt" fieldValue={data.prompt} settingsCallback={settingsCallback}/>

            <TextInput field="Negative Prompt" fieldName="negativePrompt" fieldValue={data.negativePrompt} settingsCallback={settingsCallback}/>

            <TextInput field="Seed" fieldName="seed" fieldValue={data.seed} settingsCallback={settingsCallback}/>

            {/* SAMPLER GOES HERE */}

            <RangeInput field="Batch Size" fieldName="batchSize" min="1" max="20" fieldValue={data.batchSize} settingsCallback={settingsCallback} disabled={true}/>

            <RangeInput field="Steps" fieldName="steps" min="1" max="50" fieldValue={data.steps} settingsCallback={settingsCallback}/>

            <RangeInput field="Width" fieldName="width" min="64" max="1024" step={64} fieldValue={data.width} settingsCallback={settingsCallback}/>

            <RangeInput field="Height" fieldName="height" min="64" max="1024" step={64} fieldValue={data.height} settingsCallback={settingsCallback}/>

            <RangeInput field="Guidance" fieldName="guidance" min="1" max="24" fieldValue={data.guidance} settingsCallback={settingsCallback}/>

            <RangeInput field="CLIP Skip" fieldName="clipSkip" min="1" max="10" fieldValue={data.clipSkip} settingsCallback={settingsCallback}/>
            
            {/* Models */}
            <SelectorInput field="Model" fieldName="model" defaultOption={data.model} settingsCallback={settingsCallback}/>

            {/* POST PROCESSOR GOES HERE */}
            {/* <SelectorInput field="Post Processor" fieldName="postProcessor" apiLink="https://raw.githubusercontent.com/db0/AI-Horde-image-model-reference/main/stable_diffusion.json"/> */}

            <div className="switchInput-div">
            <SwitchInput field="Hi-res fix" fieldName="hiResFix" fieldCheck={data.hiResFix} settingsCallback={settingsCallback}/>

            <SwitchInput field="Karras" fieldName="karras" fieldCheck={data.karras} settingsCallback={settingsCallback}/>

            <SwitchInput field="Trusted Workers" fieldName="trustedWorkers" fieldCheck={data.trustedWorkers} settingsCallback={settingsCallback}/>

            {/* <SwitchInput field="Create Video" fieldName="createVideo" fieldCheck={data.createVideo} settingsCallback={settingsCallback}/> */}

            <SwitchInput field="Tiling" fieldName="tiling" fieldCheck={data.tiling} settingsCallback={settingsCallback}/>

            {/* <SwitchInput field="NSFW" fieldName="nsfw" fieldCheck={data.nsfw} settingsCallback={settingsCallback}/> */}

            {/* <SwitchInput field="X/Y Plot" fieldName=""/> */}
            </div>

            {/* MULTI SELECT GOES HERE */}
        </div>
        )
    }