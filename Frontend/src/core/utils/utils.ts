export default class Utils {
    
    public static set_url(url: string, paths: string[]): string{

        if(paths.length == 0){
            return url;
        }

        let path: string | undefined = paths.shift();
        let endpoint = url + `/${path}`;

        return this.set_url(endpoint, paths);
    }
}