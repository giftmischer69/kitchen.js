call conda env create -f environment.yaml
call conda activate kitchen
call npm install
call npm run build
python -m kitchen mode=gui