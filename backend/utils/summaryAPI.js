const getResponse = async(message, type)=>{
    try{
        const response=await fetch("http://localhost:5000/summarizeBook", {
            method: "POST",
            body: JSON.stringify({
                "text": message,
                "summary_type": type
            }), 
            headers: { 
                "Content-Type": "application/json" 
            }
        },        
    );
        const data=await response.json();
        return (data);
    }catch(err){
        console.log(err);
        return {
            success: false,
            summary: null,
            error: "Flask server not reachable"
        };
    }
}

export default getResponse;