<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-4 mt-4">
            <div class="col-sm-6">
                <h1 class="m-0">{{ $page_title }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="dashboard">Home</a></li>
                    <li class="breadcrumb-item active">{{ $page_title }}</li>

                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header bg-primary" id="dttable">
                        <h5>List of States</h5>
                        <div class="card-header-right">
                            <a class="mr-3 text-white" role="button" id="addIdBtn" href="{{('addState')}}"><i
                                    class="fa-solid fa-plus"></i> Add New
                                State</a>
                        </div>
                    </div>
                    <div class="card-block tab-icon mt-2">
                        <div class="row">
                            <div class="col-12 table-responsive text-sm">
                                <table id="dtState" class="table table-striped table-bordered nowrap"
                                    style="width:100%;" data-url="{{ route('dtState') }}">
                                    <thead class="bg-primary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Country Name</th>
                                            <th>State Name</th>
                                            <th>State Short Name</th>
                                            <th>State Code</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                              
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->