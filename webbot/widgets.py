import tw2.forms as twf

class WebbotForm(twf.TableForm):
    userid = twf.HiddenField()

class UploadForm(WebbotForm):
    code = twf.FileField()
    name = twf.TextField()
