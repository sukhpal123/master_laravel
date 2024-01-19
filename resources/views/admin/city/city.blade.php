<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header bg-primary" id="dttable">
                        <h5>List of City</h5>
                        <div class="card-header-right">
                            <a class="mr-3 text-white" role="button" id="addIdBtn" href="{{ route('addCity') }}"><i
                                    class="fa-solid fa-plus"></i> Add New
                                City</a>
                        </div>
                    </div>
                    <div class="card-block tab-icon mt-2">
                        <div class="row">
                            <div class="col-12 table-responsive text-sm">
                                <table id="dtCity" class="table table-striped table-bordered nowrap"
                                    style="width:100%;" data-url="{{ route('dtCity') }}">
                                    <thead class="bg-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Country Name</th>
                                            <th>State Name</th>
                                            <th>City Name</th>
                                            <th>City Short Name</th>
                                            <th>City Code</th>
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
