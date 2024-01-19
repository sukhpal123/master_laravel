<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header bg-primary" id="dttable">
                        <h5>List of Location</h5>
                        <div class="card-header-right">
                            <a class="mr-3 text-white" role="button" id="addIdBtn" href="{{ route('addLocation') }}"><i
                                    class="fa-solid fa-plus"></i> Add New
                                Location</a>
                        </div>
                    </div>
                    <div class="card-block tab-icon mt-2">
                        <div class="row">
                            <div class="col-12 table-responsive text-sm">
                                <table id="dtLocation" class="table table-striped table-bordered nowrap"
                                    style="width:100%;" data-url="{{ route('dtLocation') }}">
                                    <thead class="bg-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Country Name</th>
                                            <th>State Name</th>
                                            <th>City Name</th>
                                            <th>Location Name</th>
                                            <th>Location Short Name</th>
                                            <th>Location Code</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                              
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
