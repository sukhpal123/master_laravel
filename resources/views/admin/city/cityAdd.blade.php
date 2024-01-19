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
                    <li class="breadcrumb-item active"><a href="{{ strtolower($page_title) }}">{{ $page_title }}</a></li>

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
                    <div class="card-block tab-icon">
                        <div class="row">
                            <div class="col-12 text-sm">
                                <form action="{{route('addCity')}}" method="POST" class="group" id="formCity">
                                    @csrf
                                    <div class="row mb-3 mt-1">
                                        <p style="background: #d1d1d13b;padding: 9px;border-radius: 5px;">Fields mark
                                            with asterix (<span class="text-red">*</span>) are required fileds.</p>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="name"><b>Country Name</b></label>
                                                <select name="country_name" id="country_name"
                                                    style="width: 100%; padding: 0.5em 0.2em; ">
                                                    <option selected="selected">Choose one</option>
                                                    <?php
                                                foreach($country_data as $country) { ?>
                                                    <option value="<?php echo $country->id?>">
                                                        <?php echo $country->country_name ?></option>
                                                    <?php
                                                } ?>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="name"><b>State Name</b></label>
                                                <select name="state_name" id="state_name"
                                                    style="width: 100%; padding: 0.5em 0.2em; ">
                                                    <option selected="selected" value="0">Choose one</option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="city_name"><b>City Name</b></label>
                                                <input type="text" class="form-control" id="city_name"
                                                    name="city_name">
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="row mb-3 mt-3">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="short"><b>Short Name</b></label>
                                                <input type="text" class="form-control" id="city_short_name"
                                                    name="city_short_name">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="cpass"></b>City Code</b></label>
                                                <input type="text" class="form-control" id="city_code"
                                                    name="city_code">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3 mt-3">
                                        <div class="col-md-12 text-center">
                                            <button type="submit" id="submit"
                                                class="btn btn-success btn-lg my-2 mx-4">Submit</button>
                                        </div>
                                    </div>
                                </form>
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
<!-- /.content -->