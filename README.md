# ComfyUI-Workflow-Modules

Fully excutable ComfyUI workflows with the same ComfyUI configuration.


All workflows are modulized and can be reused in different purposes.


## ComfyUI Configuration


1. Clone ComfyUI & ComfyUI-Manager

   ```
   git clone https://github.com/comfyanonymous/ComfyUI.git
   cd ComfyUI/custom_nodes
   git clone https://github.com/Comfy-Org/ComfyUI-Manager.git
   ```

1. venv (python 3.12.7)

   Mac

   ```
   python -m venv venv
   source venv/bin/activate
   ```

   Windows

   ```
   python -m venv venv
   .\venv\Scripts\activate
   ```

1. Install ComfyUI dependencies

   ```sh
   # this command is for Mac
   pip install --pre torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/nightly/cpu

   # this is for Windows (NVIDIA GPU)
   pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu128
   ```

   ```sh
   cd ComfyUI
   pip3 install -r requirements.txt
   ```

   ```
   cd ComfyUI/custom_nodes/ComfyUI-Manager
   pip3 install -r requirements.txt
   ```

1. Clone & Put `ComfyUI-Workflow-Modules` as `default` folder in `ComfyUI/user`

   ```
   git clone https://github.com/ruucm/ComfyUI-Workflow-Modules.git
   cp -r ComfyUI-Workflow-Modules ComfyUI/user/default
   ```

1. Restore Snapshot & Dependencies

   https://github.com/Comfy-Org/ComfyUI-Manager/blob/main/docs/en/cm-cli.md

   ```
   python cm-cli.py restore-snapshot --pip-non-url --pip-non-local-url --pip-local-url [your-comfyui-path]/user/default/ComfyUI-Manager/snapshots/harbor-school.json
   ```

   ```
   python cm-cli.py restore-dependencies
   ```

1. Start ComfyUI with the `input` directory

   ```
   python main.py --input-directory [your-comfyui-path]/user/default/public/input
   ```


## Workflow Modules

Supporting Models
- SD1.5
- Flux


### _starter

Essential model load & text prompt.


### _generate

Generate images.


### _controls

Control details of the generated image.


### _postprocess

(WIP) Postprocess the generated image.


### _utils

Utility workflows.

### _examples

Examples of using the workflow modules.
