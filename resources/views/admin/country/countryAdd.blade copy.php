
<div class="modal-body bg-warning text-dark">
    <form action="{{route('addCountry')}}" method="POST" class="group">
        @csrf
        <label for="name"><b>Country Name</b></label>
        <input type="text" class="form-control" id="name" name="countryname">
        <label for="short"><b>Short Name</b></label>
        <input type="text" class="form-control" id="shortname" name="countryshort">
        <label for="cpass"></b>Country Code</b></label>
        <input type="text" class="form-control" id="code" name="countrycode">
        <button type="submit" id="submit" class="btn btn-success btn-lg my-2 mx-4">Submit</button>
    
    </form>
</div>
