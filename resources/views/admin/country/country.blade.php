
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
                            <h5>List of Countries</h5>
                            <div class="card-header-right">
                                <a class="mr-3 text-white" role="button" id="addIdBtn" href="{{('addCountry')}}"><i
                                        class="fa-solid fa-plus"></i> Add New
                                    Country</a>
                            </div>
                        </div>
                        <div class="card-block tab-icon mt-2">
                            <div class="row">
                                <div class="col-12 table-responsive text-sm">
                                    <table id="dtDist" class="table table-striped table-bordered nowrap"
                                        style="width:100%;">
                                        <thead class="bg-primary">
                                            <tr>
                                                <th>ID</th>
                                                <th>Country Name</th>
                                                <th>Country Short Name</th>
                                                <th>Country Code</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @if(count($country_list)>0)
                                            @foreach($country_list as $sno => $list)
                                            <tr>
                                                <td>{{ $sno + 1 }}</td>
                                                <td>{{ $list->country_name }}</td>
                                                <td>{{ $list->country_short_name }}</td>
                                                <td>{{ $list->country_code }}</td>
                                                <td>
                                                    <a href="{{ route('editCountry', $list->id) }}"
                                                        class="btn btn-success"><i class="fa fa-phone"></i>&nbsp;
                                                        Update</a> &nbsp&nbsp
                                                    <a href="{{ route('deleteCountry', $list->id) }}"
                                                        class="btn btn-danger"
                                                        onclick="return confirm('Are you sure, you want to delete this device?')">
                                                        <i class="fa fa-trash" aria-hidden="true">&nbsp;Delete</i></a>
                                                </td>
                                            </tr>
                                            @endforeach

                                            @else
                                            <tr>
                                                <td colspan="8" align="center">Sorry, no records found!</td>
                                            </tr>

                                            @endif
                                        </tbody>
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
