import { CheckCircle2 } from "lucide-react";

function CodePreview() {
  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">

      {/* Window Header */}

      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800">

        <div className="w-3 h-3 rounded-full bg-red-500"/>

        <div className="w-3 h-3 rounded-full bg-yellow-500"/>

        <div className="w-3 h-3 rounded-full bg-green-500"/>

        <span className="ml-4 text-slate-400 text-sm">

          review.cpp

        </span>

      </div>

      {/* Code */}

      <pre className="p-6 text-sm leading-7 overflow-x-auto">

{`int binarySearch(vector<int>& arr,int target){

    int low=0;
    int high=arr.size()-1;

    while(low<=high){

        int mid=(low+high)/2;

        if(arr[mid]==target)
            return mid;

        if(arr[mid]<target)
            low=mid+1;

        else
            high=mid-1;

    }

    return -1;
}`}

      </pre>

      {/* AI RESULT */}

      <div className="border-t border-slate-800 p-5 bg-slate-950">

        <div className="flex items-center gap-3 text-green-400">

          <CheckCircle2 className="w-5 h-5"/>

          AI Review Complete

        </div>

        <p className="mt-3 text-slate-400 text-sm">

          ✓ Time Complexity : O(log n)

          <br/>

          ✓ Space Complexity : O(1)

          <br/>

          ✓ No Bugs Detected

          <br/>

          ✓ Suggestion : Use

          <span className="text-blue-400">

            {" "}mid = low + (high-low)/2

          </span>

        </p>

      </div>

    </div>

  );
}

export default CodePreview;