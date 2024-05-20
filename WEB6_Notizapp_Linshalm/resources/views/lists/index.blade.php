<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
<h2>Listen</h2>
<ul>
    @foreach($lists as $list)
        <li><a href="lists/{{$list->id }}">{{ $list->name }}</a></li>
    @endforeach

</ul>
</body>
</html>
