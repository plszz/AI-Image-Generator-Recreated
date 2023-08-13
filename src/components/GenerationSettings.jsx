import TextInput from "./TextInput"
import RangeInput from "./RangeInput"
import SwitchInput from "./SwitchInput"
import SelectorInput from "./SelectorInput"

export default function GenerationSettings() {
    return(
        <div id="generationSettings-div">
            <TextInput field="Prompt" fieldName="prompt"/>

            <TextInput field="Negative Prompt" fieldName="negativePrompt"/>

            <TextInput field="Seed" fieldName="seed"/>

            {/* SAMPLER GOES HERE */}

            <RangeInput field="Batch Size" fieldName="batchSize" base="1" min="1" max="20"/>

            <RangeInput field="Steps" fieldName="steps" base="30" min="1" max="50"/>

            <RangeInput field="Width" fieldName="width" base="512" min="64" max="1024"/>

            <RangeInput field="Height" fieldName="height" base="512" min="64" max="1024"/>

            <RangeInput field="Guidance" fieldName="guidance" base="7" min="1" max="24"/>

            <RangeInput field="CLIP Skip" fieldName="clipSkip" base="1" min="1" max="10"/>

            {/* MODEL GOES HERE */}
            <SelectorInput field="Model" fieldName="model" apiLink="https://stablehorde.net/api/v2/status/models"/>

            {/* POST PROCESSOR GOES HERE */}
            {/* <SelectorInput field="Post Processor" fieldName="postProcessor" apiLink="https://raw.githubusercontent.com/db0/AI-Horde-image-model-reference/main/stable_diffusion.json"/> */}

            <div className="switchInput-div">
                <SwitchInput field="Hi-res fix" fieldName="hiResFix"/>

                <SwitchInput field="Karras" fieldName="karras"/>

                <SwitchInput field="Trusted Workers" fieldName="trustedWorkers"/>

                <SwitchInput field="Create Video" fieldName="createVideo"/>

                <SwitchInput field="Tiling" fieldName="tiling"/>

                <SwitchInput field="NSFW" fieldName="nsfw"/>

                {/* <SwitchInput field="X/Y Plot" fieldName=""/> */}
            </div>

            {/* MULTI SELECT GOES HERE */}
        </div>
    )
}