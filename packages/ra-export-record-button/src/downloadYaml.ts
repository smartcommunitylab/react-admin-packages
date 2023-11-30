export default (yaml: string, filename: string): void => {
    //export string as blob with exposed contextType
    const blob = new Blob([yaml], { type: 'application/yaml;charset=utf-8' });

    // Creating the hyperlink and auto click it to start the download
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.yaml`;
    link.click();
};
